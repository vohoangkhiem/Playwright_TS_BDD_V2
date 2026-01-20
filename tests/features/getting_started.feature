@ui @smoke @sanity
Feature: Navigate to getting started section  
  As a user of the system,
  I want to able to navigate to the getting started section
  So that I can start learning Playwright.

  Scenario: Navigate to getting started section
    Given I am on the Playwright home page
    When I click the header item "Docs"
    Then I should land on a page containing "/docs/intro"
