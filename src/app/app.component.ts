import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { select, zoom, event, geoMercator, geoPath } from 'd3';

import { feRockStars } from './Repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mapHost') hostElement: ElementRef;

  ngOnInit() {
    const htmlNode = this.createHtmlNode(this.hostElement.nativeElement);
    // const svgNode = this.createSvgNode(this.hostElement.nativeElement, '#ccc');

    const nodes = htmlNode.selectAll('div')
      .data(feRockStars);

    nodes.enter()
      .append('div')
      .style('text-align', 'center')
      .style('padding', '10px')
      .text(d => d.name)
      .append('div')
      .text(d => d.country);
  }

  private createHtmlNode(hostElement: any) {
    return select(hostElement);
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
