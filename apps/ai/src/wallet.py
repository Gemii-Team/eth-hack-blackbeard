from cdp import *
from dotenv import load_dotenv
import os

# โหลด API Key จาก .env
load_dotenv()

api_key_name = os.getenv("CDP_API_KEY_NAME")
api_key_private_key = os.getenv("CDP_API_KEY_PRIVATE_KEY")

# ตั้งค่า SDK
Cdp.configure(api_key_name, api_key_private_key)
print("✅ CDP SDK ได้รับการตั้งค่าเรียบร้อยแล้ว!")

# 🔹 1. ฟังก์ชันสร้างกระเป๋า
def create_wallet():
    wallet = Wallet.create()
    print(f"✅ กระเป๋าใหม่ถูกสร้างขึ้น: {wallet}")
    print(f"📌 ที่อยู่กระเป๋าหลัก: {wallet.default_address}")
    return wallet

# 🔹 2. ฟังก์ชันเติมเหรียญ (Faucet)
def fund_wallet(wallet, token="eth"):
    faucet_tx = wallet.faucet(token)
    faucet_tx.wait()
    print(f"✅ เติม {token.upper()} สำเร็จ: {faucet_tx}")

# 🔹 3. ฟังก์ชันโอนเหรียญ
def transfer_funds(from_wallet, to_wallet, amount, currency="eth", gasless=False):
    transfer = from_wallet.transfer(amount, currency, to_wallet, gasless=gasless).wait()
    print(f"✅ โอน {amount} {currency.upper()} สำเร็จ: {transfer}")

# 🔹 4. ฟังก์ชันตรวจสอบธุรกรรม
def list_transactions(wallet):
    transactions = wallet.default_address.transfers()
    print("📌 รายการธุรกรรม:")
    for tx in transactions:
        print(tx)

# 🔹 5. ฟังก์ชันแลกเปลี่ยนเหรียญ (Swap Crypto)
def trade_crypto(wallet, amount, from_currency, to_currency):
    trade = wallet.trade(amount, from_currency, to_currency).wait()
    print(f"✅ Swap {amount} {from_currency.upper()} ➡ {to_currency.upper()} สำเร็จ: {trade}")

# 🔹 6. ฟังก์ชันบันทึก Seed และกู้คืนกระเป๋า
# 🔹 บันทึก Seed ลงไฟล์ (ถูกต้อง ✅)
def save_wallet_seed(wallet, file_path="wallet_seed.json"):
    wallet.save_seed_to_file(file_path, encrypt=True)  # ✅ ใช้ `save_seed_to_file()`
    print(f"✅ Seed ถูกบันทึกที่: {file_path}")

# 🔹 โหลด Seed กลับมาใช้งาน (แก้ไข ✅)
def load_wallet_seed(wallet_id, file_path="wallet_seed.json"):
    wallet = Wallet.fetch(wallet_id)  # ✅ ดึงข้อมูลกระเป๋าเดิมมา
    wallet.load_seed_from_file(file_path)  # ✅ โหลด seed จากไฟล์เข้า wallet
    print(f"✅ กระเป๋าถูกกู้คืนสำเร็จ: {wallet}")
    return wallet

# 🔹 7. ฟังก์ชันตั้งค่า Webhook
def create_webhook(wallet, callback_url):
    webhook = wallet.create_webhook(callback_url)
    print(f"✅ Webhook ถูกสร้างขึ้น: {webhook}")

# 🔹 8. ฟังก์ชันสร้าง Webhook สำหรับ ERC20 Transfer
def create_token_webhook(callback_url, from_address, network="base-mainnet"):
    from cdp.client.models.webhook import WebhookEventType, WebhookEventFilter
    webhook = Webhook.create(
        notification_uri=callback_url,
        event_type=WebhookEventType.ERC20_TRANSFER,
        event_filters=[WebhookEventFilter(from_address=from_address)],
        network_id=network
    )
    print(f"✅ Webhook สำหรับ ERC20 Transfer ถูกสร้างขึ้น: {webhook}")

# ✅ 1. สร้างกระเป๋า
wallet1 = create_wallet()

# ✅ 2. เติมเหรียญ (ETH)
fund_wallet(wallet1, "eth")

# ✅ 3. สร้างกระเป๋าใหม่เพื่อรับเหรียญ
wallet2 = create_wallet()

# ✅ 4. โอน ETH จาก wallet1 ไป wallet2
transfer_funds(wallet1, wallet2, 0.00001, "eth")

# ✅ 5. ตรวจสอบธุรกรรม
list_transactions(wallet1)

# ✅ 6. Swap ETH ➡ USDC
# trade_crypto(wallet1, 0.00001, "eth", "usdc")

# ✅ 7. บันทึกและกู้คืน Seed
# ✅ บันทึก Seed
save_wallet_seed(wallet1, "wallet1_seed.json")

# ✅ โหลดกระเป๋ากลับมาใช้งาน
wallet_restored = load_wallet_seed(wallet1.id, "wallet1_seed.json")

# ✅ 8. ตั้งค่า Webhook
# create_webhook(wallet1, "https://your-app.com/callback")
