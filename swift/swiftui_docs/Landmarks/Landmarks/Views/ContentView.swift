//
//  ContentView.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 22/03/24.
//

import SwiftUI
struct ContentView: View {
    var body: some View {
        LandmarkList()
    }
}

#Preview {
    ContentView().environment(ModelData())
}
