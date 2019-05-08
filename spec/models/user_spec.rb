require 'rails_helper'

RSpec.describe User, type: :model do

  it { should have_many(:requests).dependent(:destroy) }
  it { should have_and_belong_to_many(:conversations) }

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }

  it { should allow_value("email@addresse.foo").for(:email) }
  it { should_not allow_value("foo").for(:email) }
  it { should_not allow_value("foo@email").for(:email) }

  it { should validate_uniqueness_of(:email)}

  it { should have_secure_password }
end
