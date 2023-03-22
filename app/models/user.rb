class User < ApplicationRecord
  require 'securerandom'

  has_many :categories
  has_many :tasks, through: :categories

  has_secure_password

  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true,
            length: { minimum: 6},
            on: create

end
