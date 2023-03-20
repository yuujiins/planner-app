class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.belongs_to :category, null: false, foreign_key: true
      t.integer :status
      t.integer :priority
      t.boolean :is_deleted, default: false
      t.datetime :task_date

      t.timestamps
    end
  end
end
