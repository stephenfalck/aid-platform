require 'rails_helper'

RSpec.describe User, type: :model do

  it { should have_many(:requests).dependent(:destroy) }
  it { should have_and_belong_to_many(:conversations) }

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:encrypted_password) }
end
