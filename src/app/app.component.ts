import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { select, zoom, event, geoMercator, geoPath } from 'd3';

import { feRockStars, circles } from './Repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mapHost') hostElement: ElementRef;

  ngOnInit() {
    const svgNode = this.createSvgNode(this.hostElement.nativeElement, '#ccc');

    svgNode.append('circle')
      .attr('r', '50')
      .attr('stroke', 'black')
      .attr('transform', `translate(600,250)`)
      .attr('fill', 'white');

    // const groups = svgNode.selectAll('circle')
    //   .data(circles);

    // const groupElements = groups.enter()
    //   .append('g')
    //   .attr('transform', (d) => `translate(${d.x},250)`);

    //   groupElements.append('circle')
    //   .attr('r', (d) => d.r)
    //   .attr('stroke', 'black')
    //   .attr('fill', 'white');

    //   groupElements.append('text')
    //   .attr('dx', (d) => -20)
    //   .text((d) => d.label);
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
}
