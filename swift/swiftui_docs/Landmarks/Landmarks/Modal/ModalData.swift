//
//  ModalData.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 16/03/24.
//

import Foundation

var landmarks: [Landmark] = load("landmarkData.json")


func load<T>(_ filename: String) -> T {
    let data:Data;
    guard let file  = Bundle.main.url(forResource: filename, withExtension: nil) // for sccessing file from bundle
    else{
        fatalError("couldn't find \(filename) in main bundle");
    }
    do{
        data = try Data(contentsOf: file)
    }catch{
        fatalError("Couldn't load  \(filename) from main bundle\n\(error)");
    }
    do{
        let decoder = JSONDecoder()
        return try decoder.decode(T.self, from: data);
    }catch{
        fatalError("Could not parse \(filename) \n\(error)")
    }
    
}
