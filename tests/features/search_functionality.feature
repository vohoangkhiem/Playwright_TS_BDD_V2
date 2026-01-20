@ui @smoke @search
Feature: Search functionality on Playwright docs
  As a user of the system,
  I want to be able to search the keywords
  So that I can find relevant documentation.

  Background: Open home page
    Given I am on the Playwright home page

  Scenario: Search for documentation topics
    When I search for the following topics:
      | query           |
      | Getting started |
      | API testing     |
      | Trace Viewer    |
      | Reporters       |
    Then each topic search result should open without error

  @regression
  Scenario: Search using JSON dataset
    When I search using json dataset "tests/data/search-queries.json"
    Then each dataset search result should open without error
