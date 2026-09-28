content = open('apps/web/src/app/[locale]/mydash/page.tsx', 'r', encoding='utf-8').read()

# Add useTranslations to ProductEditForm
if "function ProductEditForm({ product, onClose }: { product: any, onClose: () => void }) {\\n  const t = useTranslations();" not in content:
    content = content.replace("function ProductEditForm({ product, onClose }: { product: any, onClose: () => void }) {", "function ProductEditForm({ product, onClose }: { product: any, onClose: () => void }) {\\n  const t = useTranslations();")

content = content.replace('>Detail<', '>{t("mydash.detail")}<')
content = content.replace('>Gambar<', '>{t("mydash.gambar")}<')
content = content.replace('<span className="text-[10px] text-gray-400 text-center leading-tight">Tambahkan<br/>Gambar</span>', '<span className="text-[10px] text-gray-400 text-center leading-tight whitespace-pre-wrap">{t("mydash.tambahkan_gambar").replace(" ", "\\n")}</span>')
content = content.replace('>Tambahkan video<', '>{t("mydash.tambahkan_video")}<')
content = content.replace('placeholder="Tempel URL YouTube di sini"', 'placeholder={t("mydash.tempel_url_youtube")}')
content = content.replace('>Judul<', '>{t("mydash.judul")}<')
content = content.replace('placeholder="Judul"', 'placeholder={t("mydash.judul")}')
content = content.replace('>Keterangan<', '>{t("mydash.keterangan")}<')
content = content.replace('placeholder="Tuliskan keterangan produk di sini..."', 'placeholder={t("mydash.tuliskan_keterangan")}')
content = content.replace('>Platform<', '>{t("mydash.platform")}<')
content = content.replace('["Mengunggah", "PDF/Ebook", "G-drive", "Lainnya"]', '[t("mydash.mengunggah"), "PDF/Ebook", "G-drive", t("mydash.lainnya")]')

open('apps/web/src/app/[locale]/mydash/page.tsx', 'w', encoding='utf-8').write(content)
print("Done")
