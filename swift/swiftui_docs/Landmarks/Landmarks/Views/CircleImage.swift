//
//  CircleImage.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 22/03/24.
//

import SwiftUI

struct CircleImage: View {
    var body: some View {
        Image("turtlerock").clipShape(Circle())
            .overlay{
                Circle().stroke(.white,lineWidth: 4)
            }.shadow(radius: /*@START_MENU_TOKEN@*/10/*@END_MENU_TOKEN@*/)
    }
}

#Preview {
    CircleImage()
}
