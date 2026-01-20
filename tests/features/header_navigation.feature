@ui @regression
Feature: Header navigation coverage
  As a user of the system,
  I want to able to navigate via header items
  So that I can access various sections of the site.
 
  Scenario: Header items from CSV dataset
    Given I am on the Playwright home page
    When I click on header items from csv "tests/data/header-items.csv"
    Then each header destination should load successfully
