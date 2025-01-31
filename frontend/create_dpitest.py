import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_driver_path = 'C:\\Users\\DELL\\Downloads\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'
url_to_open = 'http://localhost:4200/'


chrome_options = webdriver.ChromeOptions()

chrome_options.add_argument("--profile-directory=Default")
chrome_options.add_argument("--disable-extensions")
chrome_options.add_argument("--disable-notifications")

service = ChromeService(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=service, options=chrome_options)

driver.maximize_window()
driver.get(url_to_open)


data = {
    'first_name': 'Abdelhak',
    'last_name': 'Amini',
    'birthdate': '15/06/2003',
    'gender': 'Masculain',
    'social_security_number' : '3216549877',
    'hospital': 'El harrach',
    'blood-type': 'O+',
    'address': 'marikaaaaan',
    'doctor': 'Dr. John Doe',
    'phone' : '0555555555',
    'email': 'johndoe@example.com',
    'password' : 'MyPassword',
    'emergency_contact_name': 'Jane Doe',
    'emergency_contact_phone': '1234567890',
    'emergency_contact_relationship': 'Sister',
    'mutuelle_name': 'HealthInsurance',
    'mutuelle_policy_number': '123456789',
    'medical_history': 'No known conditions'
}


wait = WebDriverWait(driver, 10)

email = "staff3@example.com"
password = "password123"

email_input = wait.until(EC.presence_of_element_located((By.ID, 'email')))
email_input.send_keys(email)

driver.find_element(By.ID, 'password').send_keys(password)

login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
login_button.click()

time.sleep(5)  # Give some time for navigation
current_url = driver.current_url
if current_url.startswith("http://localhost:4200/doctor/"):
    print("Login successful!")
else:
    raise Exception("Login failed! Halting execution.")

driver.find_element(By.XPATH, "//button[span[text()='Créer un nouveau DPI']]").click()

full_name_input = wait.until(EC.presence_of_element_located((By.ID, 'last_name')))
full_name_input.send_keys(data['last_name'])
driver.find_element(By.ID, 'first_name').send_keys(data['first_name'])

driver.find_element(By.ID, 'birthdate').send_keys(data['birthdate'])
driver.find_element(By.ID, 'gender').send_keys(data['gender'])
driver.find_element(By.ID, 'social_security_number').send_keys(data['social_security_number'])
driver.find_element(By.ID, 'hospital').send_keys(data['hospital'])
driver.find_element(By.ID, 'blood-type').send_keys(data['blood-type'])
driver.find_element(By.ID, 'address').send_keys(data['address'])
driver.find_element(By.ID, 'doctor').send_keys(data['doctor'])
driver.find_element(By.ID, 'phone').send_keys(data['phone'])
driver.find_element(By.ID, 'email').send_keys(data['email'])
driver.find_element(By.ID, 'password').send_keys(data['password'])
driver.find_element(By.ID, 'confirm_password').send_keys(data['password'])
driver.find_element(By.ID, 'doctor').send_keys(data['doctor'])
driver.find_element(By.ID, 'emergency_contact_name').send_keys(data['emergency_contact_name'])
driver.find_element(By.ID, 'emergency_contact_phone').send_keys(data['emergency_contact_phone'])
driver.find_element(By.ID, 'emergency_contact_relationship').send_keys(data['emergency_contact_relationship'])
driver.find_element(By.ID, 'mutuelle_name').send_keys(data['mutuelle_name'])
driver.find_element(By.ID, 'mutuelle_policy_number').send_keys(data['mutuelle_policy_number'])
driver.find_element(By.ID, 'medical_history').send_keys(data['medical_history'])

confirm_button = driver.find_element(By.XPATH, '//button[@type="submit"]')
confirm_button.click()

time.sleep(10)

print("Page Title:", driver.title)

driver.quit()
