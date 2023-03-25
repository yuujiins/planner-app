require "test_helper"
require 'helpers/auth_helper'


class Api::V1::CategoriesControllerTest < ActionDispatch::IntegrationTest
  include AuthHelper

  setup do
    @user = User.all.first
    @headers = set_headers(@user)
    Rails.cache.clear
  end

  test "prevent unauthorized" do
    get api_v1_categories_url, xhr: true

    assert_response :unauthorized
  end

  test "show categories" do
    get api_v1_categories_url, headers: @headers, xhr: true

    assert_response :ok
  end

  test "show specific category" do
    category = categories(:one)
    get api_v1_categories_url(category), headers: @headers, xhr: true

    assert_response :ok
  end

  test "show all tasks for category" do
    category = categories(:one)
    get api_v1_categories_url(category) + '/tasks', headers: @headers, xhr: true

    assert_response :ok
  end

  test "create new category" do
    assert_difference("Category.count") do
      post api_v1_categories_url, headers: @headers, xhr: true, params: {
        name: 'Sample Category',
        description: 'Sample Description'
      }
    end

    assert_response :created
  end

  test "update category" do
    category = categories(:one)

    put api_v1_category_url(category), headers: @headers, xhr: true, params: {
      name: 'Changed Name',
      description: 'Changed description'
    }

    assert_response :no_content
  end

  test "delete category" do
    category = categories(:one)

    delete api_v1_category_url(category), headers: @headers, xhr: true

    assert_response :ok
  end
end
