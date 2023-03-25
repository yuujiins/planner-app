class ChangeUserIdToNotNullFromTasks < ActiveRecord::Migration[7.0]
  def change
    change_column :tasks, :category_id, :bigint, :null => false
  end
end
