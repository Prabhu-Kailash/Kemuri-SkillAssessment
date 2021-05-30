import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select
import time


class StockOutputResults(unittest.TestCase):

    # Sets up drivers to start running the test cases
    def setUp(self):
        self._option = Options()
        self._option.add_argument("--start-maximized")
        self._option.add_argument("--headless")
        self.driver = webdriver.Chrome(
            executable_path="chromedriver.exe", options=self._option)
        self.driver.get("https://kemuriskilltest-kailash.website/")
        self._upload = self.driver.find_element_by_id("upload-csv")

        # While running test suite make sure to replace "\\absolute\\path\\to\\" to absolute path in your local machine
        self._upload.send_keys("\\absolute\\path\\to\\DDT\\Sample Stock Price List.csv")
        self.driver.implicitly_wait(15)

    # Verifies if the home page shows up by checking the header tag
    def test_smoke(self):
        heading = self.driver.find_element_by_tag_name("h5").text
        assert heading == "OUTPUT"

    # Tries changing the start date within the given input range and verifies if it's changed
    def test_selectStartDate(self):
        time.sleep(1)
        date = self.driver.find_element_by_tag_name("input")
        date.click()
        date.send_keys("2020-02-12")
        assert date.get_attribute("value") == "2020-02-12"

    # Tries changing the end date within the given input range and verifies if it's changed
    def test_selectEndDate(self):
        time.sleep(1)
        date = self.driver.find_elements_by_tag_name("input")[1]
        date.click()
        date.send_keys("2020-02-20")
        assert date.get_attribute("value") == "2020-02-20"

    # Verifies select tag functionality by choosing a different option from dropdown
    def test_dropDown(self):
        time.sleep(1)
        select = Select(self.driver.find_element_by_id("slct"))
        select.select_by_visible_text("GOOGL")
        assert select.first_selected_option.text == "GOOGL"

    # Verifies form submit functionality by clicking on submit button
    def test_submit(self):
        time.sleep(1)
        self.driver.find_element_by_id("btn").click()
        heading = self.driver.find_element_by_tag_name("h5").text
        assert heading == "RESULT"

    # Verifies if results are published as expected
    def test_results(self):
        time.sleep(1)
        self.driver.find_element_by_id("btn").click()
        time.sleep(1)
        result = self.driver.find_element_by_id("stock").text
        assert result == "STOCK : AAPL"

    # Verifies home button functionality from Results page
    def test_backToHome(self):
        time.sleep(1)
        self.driver.find_element_by_id("btn").click()
        time.sleep(1)
        self.driver.find_element_by_tag_name("a").click()
        heading = self.driver.find_element_by_tag_name("h2").text
        assert heading == "STOCK CALCULATOR"

    # Verifies if error page is showing up if tried reaching invalid endpoint
    def test_invalidURL(self):
        time.sleep(1)
        self.driver.get("https://kemuriskilltest-kailash.website/testing")
        time.sleep(1)
        heading = self.driver.find_element_by_tag_name("h2").text
        assert heading == "OOPS! SOMETHING WENT WRONG"

    # Tears down the setup initialized once all the test cases are ran
    def tearDown(self):
        self.driver.quit()
