class Api::V1::ShopsController < ApplicationController
  def index
    puts"======helllo=====";
    render json:{'test':1}
  end
end
