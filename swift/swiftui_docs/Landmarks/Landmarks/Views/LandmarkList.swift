//
//  LandmarkList.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 25/03/24.
//

import SwiftUI

struct LandmarkList: View {
    var body: some View {
        NavigationSplitView{
            List(landmarks){landmark in
                NavigationLink{
                    LandmarkDetail(landmark: landmark)
                }label:{
                    LandmarkRow(landmark: landmark);
                }
            }
            .navigationTitle("landmark")
        }detail: {
            Text("select a landmark")
        }
       
    }
}

#Preview {
    LandmarkList()
}
