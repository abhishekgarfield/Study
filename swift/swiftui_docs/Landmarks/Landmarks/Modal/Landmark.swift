//
//  Landmark.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 16/03/24.
//

import Foundation
import SwiftUI;
import CoreLocation;

struct Landmark: Hashable , Codable {
    var id: Int
    var name: String
    var park: String
    var state: String
    var description: String
    private var imageName: String; // private access control now it can only be accessed inside same class or struct
    var image: Image {
        //computed property
        Image(imageName);
    }
    private var coordinates: Coordinates
    var locationCoordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(
            latitude: coordinates.latitude,
            longitude: coordinates.longitude)
    }
    struct Coordinates: Hashable, Codable {
        var latitude: Double
        var longitude: Double
    }
}
