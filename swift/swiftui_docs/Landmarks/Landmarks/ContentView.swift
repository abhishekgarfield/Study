//
//  ContentView.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 22/03/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack{
            MapView().frame(height: 300);
            VStack{
                CircleImage();
                VStack(alignment: .leading){
                    Text("Turtle Rock").font(.title)
                    HStack{
                        Text("zoo name")
                        Spacer();
                        Text("California")
                    }.font(.subheadline).foregroundStyle(.secondary)
                    Divider();
                    Text("About turtle rock").font(.title2)
                    Text("Descriptive text goes here")
                }
                .padding()
            }.offset(y: -100)
            Spacer();
        }
        
    }
}

#Preview {
    ContentView()
}
