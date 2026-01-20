@smoke @regression @navigation @polymorphism
Feature: Docs sidebar navigation
  As a user of the system,
  I want to able to navigate through the documentation using the sidebar,
  So that I can quickly access important sections.

  Scenario Outline: Navigate to documentation sections
    Given I am on the Getting Started page
    When I open the doc sidebar item "<section>"
    Then the page should show header "<section>"

    Examples:
      | section                    |
      | Writing tests              |
      | Generating tests           |
      | Running and debugging tests|