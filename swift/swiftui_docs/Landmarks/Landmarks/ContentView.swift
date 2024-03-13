//
//  ContentView.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 12/03/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading) {// vstack align their contents to center
            Text("Hello,turtle!").foregroundColor(.blue).bold().font(.title)
            HStack(){
                Text("Joshua tree natiional park").font(.subheadline);
                Spacer(); // it takes on the full width of parent
                Text("jimbabe").font(.subheadline)
            }
            .padding()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
