class User < ApplicationRecord
    has_many :requests, dependent: :destroy
    has_many :messages
    has_and_belongs_to_many :conversations

    validates_presence_of :first_name, :last_name, :email, :encrypted_password
end
