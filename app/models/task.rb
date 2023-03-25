class Task < ApplicationRecord
  belongs_to :category

  validates :name, presence: true
  validates :task_date, presence: true
  validates :category_id, presence: true
end
