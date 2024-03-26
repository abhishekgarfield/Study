//
//  LandmarkList.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 25/03/24.
//

import SwiftUI

struct LandmarkList: View {
    @Environment(ModelData.self) var modelData;
    
    @State private var showFavOnly = true;
    
    var filteredLandmarks:[Landmark] {
        modelData.landmarks.filter({(landmark) in
            landmark.isFavorite || !showFavOnly
        })
    }
    
    var body: some View {
        NavigationSplitView{
            List{
                Toggle(isOn: $showFavOnly, label: {
                    Text("Show favourites")
                })
                ForEach(filteredLandmarks){landmark in
                    NavigationLink{
                        LandmarkDetail(landmark: landmark)
                    }label:{
                        LandmarkRow(landmark: landmark);
                        if(landmark.isFavorite){
                            Image(systemName: "star.fill").foregroundColor(.yellow);
                        }
                    }
                }}
            .animation(.default,value: filteredLandmarks)
            .navigationTitle("landmark")
        }detail: {
            Text("select a landmark")
        }
       
    }
}

#Preview {
    LandmarkList().environment(ModelData())
}
