require "test_helper"
require 'helpers/auth_helper'

class Api::V1::TasksControllerTest < ActionDispatch::IntegrationTest
  include AuthHelper

  setup do
    @user = User.all.first
    @headers = set_headers(@user)
    Rails.cache.clear
  end

  test "prevent unauthorized" do
    task = tasks(:one)
    get api_v1_task_url(task), xhr: true
    assert_response :unauthorized
  end

  test  "get all tasks" do
    get api_v1_tasks_url, headers: @headers, xhr: true

    assert_response :ok
  end

  test "get specific task" do
    task = tasks(:one)
    get api_v1_task_url(task), headers: @headers, xhr: true

    assert_response :ok
  end

  test "create task" do

    assert_difference("Task.count") do
      post api_v1_tasks_url, headers: @headers, xhr: true, params: {
        name: 'Sample',
        priority: 0,
        status: 0,
        is_deleted: false,
        task_date: Date.today,
        category_id: categories(:one).id
      }
    end

    assert_response :created
  end

  test "update task" do
    task = tasks(:one)

    put api_v1_task_url(task), headers: @headers, xhr: true, params: {
      name: 'Sample changed',
      priority: 1
    }

    assert_response :no_content
  end

  test "delete task" do
    task = tasks(:one)

    delete api_v1_task_url(task), headers: @headers, xhr: true


    assert_response :ok
  end

end
