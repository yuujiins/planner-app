class ChangeTaskDateFromTasks < ActiveRecord::Migration[7.0]
  def change
    change_column :tasks, :task_date, :date
  end
end
