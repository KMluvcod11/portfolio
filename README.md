# Kathapong Portfolio

เว็บ HTML / CSS / JavaScript ไม่ใช้ framework

## เริ่มใช้งาน

รันจากโฟลเดอร์ Portfolio (ต้องมี Node.js/npm และ Python):

```sh
npm run dev
```

เปิด http://127.0.0.1:5173 และเปิด Terminal ค้างไว้ กด Ctrl+C เพื่อหยุด

## แก้ส่วนไหน เปิดไฟล์อะไร

| ส่วนที่ต้องการแก้ | ไฟล์หรือโฟลเดอร์ |
| --- | --- |
| ข้อความหน้าแรก ผลงาน เกี่ยวกับฉัน ติดต่อ | `index.html` |
| รูปแกลเลอรี Facecheck และคำอธิบาย | `pages/facecheck-gallery.html` |
| สี ตัวอักษร โครงหน้า การ์ด และหน้าจอมือถือ | `styles/main.css` |
| รูปแบบแกลเลอรี | `styles/gallery.css` |
| ขนาดตัวละคร ตำแหน่งและกรอบดวงตา | `styles/avatar.css` |
| การมองตามเมาส์ | `scripts/avatar.js` |
| ภาพตัวละคร | `assets/avatar/` |
| ภาพ Eh?Bot | `assets/projects/ehbot/` |
| ภาพ Facecheck | `assets/projects/facecheck/` |
| ตรวจการขยับตาและมือถือ | `tests/verify-avatar.cjs` |
| ตรวจบัคชี้เมาส์ทั้งสี่ทิศ | `tests/check-hover.cjs` |
| ภาพผลทดสอบ ไม่ใช่รูปผลงานบนเว็บ | `tests/screenshots/` |
| คำสั่ง npm | `package.json` |

หน้าแรกโหลด main.css → gallery.css → avatar.css ตามลำดับ และโหลด scripts/avatar.js หลัง HTML พร้อมใช้งาน กรอบตา SVG อยู่ใน index.html

หน้าใน pages/ ใช้ ../ เพื่ออ้างอิงรูป สไตล์ และกลับหน้าแรก เมื่อย้ายหรือเปลี่ยนชื่อรูป ต้องแก้ทั้ง src และ href ที่อ้างถึงรูปนั้น

## ทดสอบ

เปิดเว็บด้วย npm run dev ก่อน แล้วเปิด Terminal อีกหน้าที่โฟลเดอร์ Portfolio:

```sh
npm test
```

ไฟล์ทดสอบใช้ Playwright จาก runtime ของ Codex ในเครื่อง Kathapong และ Microsoft Edge จึงยังรันบนเครื่องอื่นไม่ได้ทันที ส่วนเว็บไซต์ไม่ต้องใช้ Playwright

ภาพหน้าภายใน Facecheck เป็น Demo / ข้อมูลตัวอย่าง หน้าลงทะเบียนใบหน้าปิดกล้องไว้ตอนแคป
