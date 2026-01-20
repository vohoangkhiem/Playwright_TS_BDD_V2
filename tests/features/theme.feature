@ui
Feature: Theme change functionality
    As a user of the system,
    I want to be able to change the theme of the website
    So that I can customize my viewing experience.

  Scenario: Theme mode cycles through light, system, dark, and back to light
    Given I am on the Playwright home page
    And the website should display in "light" theme

    When I click the theme toggle button to switch to "system mode"
    Then the website should display in "system" theme

    When I click the theme toggle button to switch to "dark mode"
    Then the website should display in "dark" theme

    When I click the theme toggle button to switch to "light mode"
    Then the website should display in "light" theme