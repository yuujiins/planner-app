class ChangeUserIdToNotNullFromCategories < ActiveRecord::Migration[7.0]
  def change
    change_column :categories, :user_id, :bigint, :null => false
  end
end
