class Request < ApplicationRecord
  belongs_to :user
  has_many :conversations

  validates_presence_of :latitude, :longitude, :fulfilled
  validates :description, presence: true, length: { maximum: 300 }
end
