import { Controller, Post, Get, Body, Headers, UnauthorizedException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

@Controller('webhooks')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  // Menambahkan GET handler untuk meloloskan 'Test URL' Lynk.id yang mungkin mengirim GET request
  @Get('lynk')
  @HttpCode(HttpStatus.OK)
  testLynkWebhook() {
    this.logger.log('Lynk.id Test URL GET Request received');
    return { message: 'Webhook endpoint is active' };
  }

  @Post('lynk')
  @HttpCode(HttpStatus.OK)
  handleLynkWebhook(
    @Headers('x-lynk-signature') signature: string,
    @Body() body: any,
  ) {
    const { refId, grandTotal, message_id } = body || {};
    const secretKey = process.env.LYNK_MERCHANT_KEY || 'HqBVUqeCu_DY5d6DTiZ0oP07PTm5B23D'; // Fallback for local testing

    this.logger.log('--- Lynk.id Webhook Received ---');
    this.logger.log(`Payload: ${JSON.stringify(body)}`);
    this.logger.log(`X-Lynk-Signature: ${signature}`);

    if (!signature) {
      this.logger.warn('Warning: Missing signature. If this is a Test URL from Lynk.id, it is expected.');
      // Untuk meloloskan tombol "Test URL" yang mungkin tidak mengirim signature
      return { message: 'Test URL received (No Signature)' };
    }

    if (!secretKey) {
      this.logger.error('Missing LYNK_MERCHANT_KEY in .env');
      throw new UnauthorizedException('Server configuration error: Missing Merchant Key');
    }

    const amountStr = String(grandTotal || '');
    const refIdStr = String(refId || '');
    const messageIdStr = String(message_id || '');

    const isValid = this.validateLynkSignature(refIdStr, amountStr, messageIdStr, signature, secretKey);

    if (!isValid) {
      this.logger.error('Invalid Lynk.id signature');
      throw new UnauthorizedException('Invalid Signature');
    }

    this.logger.log('Lynk.id webhook validated successfully!');
    // NOTE: Process the webhook data here

    return { message: 'Webhook received and processed successfully' };
  }

  private validateLynkSignature(
    refId: string,
    amount: string,
    messageId: string,
    receivedSignature: string,
    secretKey: string,
  ): boolean {
    const signatureString = amount + refId + messageId + secretKey;
    const calculatedSignature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');
    return calculatedSignature === receivedSignature;
  }
}
