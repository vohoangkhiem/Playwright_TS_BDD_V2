@ui @smoke
Feature: Footer content validation
  As a user of the system,
  I want to able to view the footer
  So that I can access related pages and resources.
  
   Scenario: Validate footer links are present
    Given I am on the Playwright home page
    Then the footer should contain links from json "tests/data/footer-links.json"
