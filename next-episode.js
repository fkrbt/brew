document.getElementById("next-episode").addEventListener("click", () => {

  if (currentEpisode < totalEpisodes) {
    currentEpisode++;
  } else {
    // move to next season
    currentSeason++;
    currentEpisode = 1;
    seasonSelect.value = currentSeason;
    fetchEpisodes(currentSeason);
    return;
  }

  episodeSelect.value = currentEpisode;
  loadShow();
});
