import unittest
from StockCalculatorTesting.StockHomePage import StockHomePage
from StockCalculatorTesting.StockOutputResults import StockOutputResults

if __name__ == '__main__':

    unittest.TestLoader.sortTestMethodsUsing = None
    # Get all tests from StockHomePage and StockOutputResults classes
    tc1 = unittest.TestLoader().loadTestsFromTestCase(StockHomePage)
    tc2 = unittest.TestLoader().loadTestsFromTestCase(StockOutputResults)

    # Create a test suite combining TestClass1 and TestClass2
    smokeTest = unittest.TestSuite([tc1, tc2])

    unittest.TextTestRunner(verbosity=2).run(smokeTest)

