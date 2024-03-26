//
//  FavoriteButton.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 26/03/24.
//

import SwiftUI

struct FavoriteButton: View {
    @Binding var isSet:Bool; // enables to read and write between a property
    
    var body: some View {
        Button{
            isSet.toggle()
        }label: {
            Label("Toggle favorite",systemImage: isSet ? "star.fill" : "star" )
                .labelStyle(.iconOnly).foregroundColor(isSet ? .yellow : .gray)
        }
    }
}

#Preview {
    FavoriteButton(isSet: .constant(true))
}
