class Role < ApplicationRecord
  has_many:employees
  has_many:customers
end
