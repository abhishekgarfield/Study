//
//  ContentView.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 12/03/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack{
            CircleImage();
            
            VStack(alignment: .leading){
                
                Text("turtle rock").font(.title);
                
                HStack(){
                    Text("Joshua tree national park")
                    Spacer()
                    Text("california")
                }.font(.subheadline).foregroundColor(.gray) // When we add a modifier to a view it applies the modifier to all the elemnts contained inthat group
                
                Divider();
                
                Text("About turtle rock").font(.title);
                Text("Descripton text goes here")
                
            }.padding()
            Spacer(); // To move content to top of view
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
