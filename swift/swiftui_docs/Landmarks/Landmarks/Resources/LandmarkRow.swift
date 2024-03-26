//
//  LandmarkRow.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 25/03/24.
//

import SwiftUI

struct LandmarkRow: View {
    var landmark:Landmark;
    var body: some View {
        HStack{
            landmark.image.resizable().frame(width: 50,height: 50);
            Text(landmark.name)
            Spacer()
        }
    }
}

#Preview {
    LandmarkRow(landmark: ModelData().landmarks[0])
}
