import requests

def track_phone_number(phone_number):
    url = f"https://api.wit.lk/phone?number={phone_number}"
    response = requests.get(url)
    data = response.json()
    if data['status'] == 'success':
        return data['location']
    else:
        return "Gagal melacak lokasi."

if __name__ == "__main__":
    phone_number = input("Masukkan nomor handphone yang ingin dilacak: ")
    location = track_phone_number(phone_number)
    print("Lokasi:", location)
