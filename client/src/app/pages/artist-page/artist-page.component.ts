import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
  standalone: false
})
export class ArtistPageComponent implements OnInit {
  artistId: string;
  artist: ArtistData;
  topTracks: TrackData[];
  albums: AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId).then((result) => {
      this.artist = result;
      console.log("Artist data:", this.artist);
    });

    this.spotifyService.getAlbumsForArtist(this.artistId).then((result) => {
      this.albums = result;
      console.log("Artist albums:", this.albums);
    });

    this.spotifyService.getTopTracksForArtist(this.artistId).then((result) => {
      this.topTracks = result;
      console.log("Artist top tracks:", this.topTracks);
    });
  }
}