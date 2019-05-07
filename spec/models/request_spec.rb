require 'rails_helper'

RSpec.describe Request, type: :model do

  it { should belong_to(:user) }
  it { should have_many(:conversations) }

  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:latitude) }
  it { should validate_presence_of(:longitude) }
  it { should validate_presence_of(:fulfilled) }
end
