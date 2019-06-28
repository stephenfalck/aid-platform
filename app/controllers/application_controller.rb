class ApplicationController < ActionController::API
    include ActionController::MimeResponds
    include Response
    include ExceptionHandler

    def fallback_index_html
      #render :file => 'public/index.html'
      #end
        respond_to do |format|
          format.html { render body: Rails.root.join('public/index.html').read }
        end
      
end
