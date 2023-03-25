require "test_helper"

class TaskTest < ActiveSupport::TestCase

  test "do not create task without required params" do
    task = Task.new
    assert_not task.save
  end

  test "create task with valid params" do
    task = Task.new({name: 'Sample', category_id: categories(:one).id, task_date: Date.today})

    assert task.save
  end

  test "get first task" do
    task = Task.all.first

    assert !task.nil?
  end

  test "edit task" do
    task = tasks(:one)
    assert_changes 'task.name', from: 'MyString', to: 'Changed name' do
      task.name = "Changed name"
    end

    assert task.save
  end

  test "delete task" do
    task = tasks(:one)
    assert task.destroy
  end

end
