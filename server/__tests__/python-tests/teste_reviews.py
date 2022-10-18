from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from time import sleep

USER_HAS_NO_REVIEWS = "Não existem reviews desse usuário."

def test_reviews():
    text: str
    with webdriver.Chrome() as driver:
        driver.get("http://localhost:3000")
        driver.maximize_window()
        driver.get("http://localhost:3000")
        sleep(3)
        driver.execute_script('return document.getElementsByClassName("HeaderButton Login")[0]').click()
        
        sleep(3)
        driver.find_element(By.ID, "userName").send_keys("andrezzz")
        driver.find_element(By.ID, "passWord").send_keys("senha123")

        sleep(2)
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "loginButton"))).click()

        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "userIconImg"))).click()
        sleep(2)

        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div[2]/div/div[2]/div[1]/div[2]'))).click()
        sleep(5)

        text = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "Reviews"))).text     
    assert text == USER_HAS_NO_REVIEWS
