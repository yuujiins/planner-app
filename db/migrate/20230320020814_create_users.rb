class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :last_name
      t.string :first_name
      t.string :middle_name
      t.string :password_digest
      t.string :email
      t.boolean :is_deleted, default: false

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
