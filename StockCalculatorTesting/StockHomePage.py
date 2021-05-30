import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


class StockHomePage(unittest.TestCase):

    # Sets up drivers to start running the test cases
    def setUp(self):
        self._option = Options()
        self._option.add_argument("--start-maximized")
        self._option.add_argument("--headless")
        self.driver = webdriver.Chrome(
            executable_path="chromedriver.exe", options=self._option)
        self.driver.get("https://kemuriskilltest-kailash.website/")
        self.driver.implicitly_wait(10)

    # Verifies if the home page shows up by checking the header tag
    def test_smoke(self):
        heading = self.driver.find_element_by_tag_name("h2").text
        assert heading == "STOCK CALCULATOR"

    # Verifies if alert is thrown if input date is invalid format
    def test_invalidDates(self):
        upload = self.driver.find_element_by_id("upload-csv")

        # While running test suite make sure to replace "\\absolute\\path\\to\\" to absolute path in your local machine
        upload.send_keys("\\absolute\\path\\to\\DDT\\Date_Testing.csv")
        assert self.driver.switch_to.alert

    # Verifies if alert is thrown if input values doesn't have required CSV headers
    def test_invalidKeys(self):
        upload = self.driver.find_element_by_id("upload-csv")
        upload.send_keys("\\absolute\\path\\to\\DDT\\Test1_KeysNotFound.csv")
        assert self.driver.switch_to.alert

    # Verifies if alert is thrown if there isn't input values with just empty headers
    def test_emptyDataset(self):
        upload = self.driver.find_element_by_id("upload-csv")
        upload.send_keys("\\absolute\\path\\to\\DDT\\Test2_EmptyDataset.csv")
        assert self.driver.switch_to.alert

    # Verifies if alert is thrown if empty file is passed as input
    def test_emptyFile(self):
        upload = self.driver.find_element_by_id("upload-csv")
        upload.send_keys("\\absolute\\path\\to\\DDT\\Test3_EmptyFile.csv")
        assert self.driver.switch_to.alert

    # Verifies if app takes to next page when uploading file with expected format/keys/date.
    def test_correctFile(self):
        upload = self.driver.find_element_by_id("upload-csv")
        upload.send_keys("\\absolute\\path\\to\\DDT\\Sample Stock Price List.csv")
        heading = self.driver.find_element_by_tag_name("h5").text
        assert heading == "OUTPUT"

    # Tears down the setup initialized once all the test cases are ran
    def tearDown(self):
        self.driver.quit()
