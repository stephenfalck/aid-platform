class Conversation < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :messages, dependent: :destroy
  belongs_to :request

  validates_presence_of :request_id, :user_id
end
