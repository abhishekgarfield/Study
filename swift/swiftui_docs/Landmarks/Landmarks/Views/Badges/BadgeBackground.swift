//
//  BadgeBackground.swift
//  Landmarks
//
//  Created by Abhishek Sharma on 28/03/24.
//

import SwiftUI

struct BadgeBackground: View {
    var body: some View {
        GeometryReader{ geometry in
            Path { path in
                var width: CGFloat = min(geometry.size.width, geometry.size.height)
                var height = width;
                let xScale: CGFloat = 0.832
                let xOffset = (width * (1 - xScale)) / 2.0
                width *= xScale
                
                path.move(to: CGPoint(x: width * 0.95 + xOffset,
                                      y: height * (0.20 + HexagonParameters.adjustment)))
                
                print("---hello ---",width,"---",width * 0.95)
                
//                path.addLines([CGPoint(x:width * 0.50, y:height * 0.05),
//                               CGPoint(x: width * 0.05, y:height * 0.20),
//                               CGPoint(x: width * 0.05, y:height * 0.70),
//                               CGPoint(x: width * 0.50, y:height * 0.85),
//                               CGPoint(x: width * 0.95, y: height * 0.7),
//                               CGPoint(x: width * 0.95, y:height * 0.22)])
                
                HexagonParameters.segments.forEach{segment in
                    
                    print("------ inside -----")
                    
                    path.addLine(to: CGPoint(
                        x: width * segment.line.x + xOffset,
                        y: height * segment.line.y))
                    
                    
                    path.addQuadCurve(
                        to: CGPoint(
                            x: width * segment.curve.x + xOffset,
                            y: height * segment.curve.y
                        ),
                        control: CGPoint(
                            x: width * segment.control.x + xOffset,
                            y: height * segment.control.y
                        )
                    )
                    
                }
                
            }.fill(.linearGradient(
                Gradient(colors: [Self.gradientStart, Self.gradientEnd]),
                startPoint: UnitPoint(x: 0.5, y: 0),
                endPoint: UnitPoint(x: 0.5, y: 0.6)
            ))
        }.aspectRatio(1,contentMode: .fit)
        
        
        
    }
    static let gradientStart = Color(red: 239.0 / 255, green: 120.0 / 255, blue: 221.0 / 255)
    static let gradientEnd = Color(red: 239.0 / 255, green: 172.0 / 255, blue: 120.0 / 255)
}

#Preview {
    BadgeBackground()
}
