import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, zoom, event, geoMercator, geoPath } from 'd3';
import { Observable } from 'rxjs/Observable';

import { feRockStars, circles } from './Repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mapHost') hostElement: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const svgNode = this.createSvgNode(this.hostElement.nativeElement, '#ccc');

    const width = this.hostElement.nativeElement.offsetWidth;
    const height = this.hostElement.nativeElement.offsetHeight;
    const projection = geoMercator()
      .center([13.42, 52.5])
      .translate([width / 2, height / 2])
      .scale([width / 0.025]);

    const path = geoPath()
      .projection(projection);

    this.getGeoData().subscribe(geoData => {
      svgNode.selectAll('path')
        .data(geoData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke', 'black');
    });
  }

  private createSvgNode(hostElement: any, backgroundColor: string) {
    const host = select(hostElement);
    const svg = host.append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', backgroundColor);

    const rootNode = svg.append('g')
      .style('fill', backgroundColor);

    const zoomHandler = zoom().on('zoom', () => {
      const transform = event.transform;
      rootNode.attr('transform', `translate(${transform.x}, ${transform.y}) scale(${transform.k})`);
    });
    host.call(zoomHandler);
    return rootNode;
  }

  private getGeoData(): Observable<any> {
    return this.http.get<any>('/assets/berlin-geo.json');
  }
}
