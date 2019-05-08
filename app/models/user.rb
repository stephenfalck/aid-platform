class User < ApplicationRecord
    has_many :requests, dependent: :destroy
    has_many :messages
    has_and_belongs_to_many :conversations

    validates :email, presence: true, format: { with: /\A[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\z/i }, uniqueness: true
    validates_presence_of :first_name, :last_name, :password_digest

    has_secure_password
end
