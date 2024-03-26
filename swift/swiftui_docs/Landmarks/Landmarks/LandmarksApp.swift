//
//  LandmarksApp.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 22/03/24.
//

import SwiftUI

@main
struct LandmarksApp: App {
    @State private var modelData = ModelData();
    var body: some Scene {
        WindowGroup {
            ContentView().environment(modelData)
        }
    }
}
